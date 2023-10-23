<?php

namespace App\Http\Controllers;

use Illuminate\Validation\Rules;
use App\Mail\InviteCreated;
use App\Models\Invite;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InviteController extends Controller
{
    public function process(Request $request)
    {
        // validate the incoming request data

        do {
            //generate a random string using Laravel's str_random helper
            $token = Str::random(16);
        } //check if the token already exists and if it does, try again
        while (Invite::where('token', $token)->first());

        $currentUser = auth()->user();
        //create a new invite record
        $invite = Invite::create([
            'email' => $request->get('email'),
            'token' => $token,
            'organization_id' => $currentUser->organization_id,
        ]);

        // send the email
        Mail::to($request->get('email'))->send(new InviteCreated($invite));

        // redirect back where we came from
        return redirect()->back();
    }

    public function accept($token)
    {
        $invite = Invite::where('token', $token)->first();
        // Look up the invite
        if (!$invite) {
            //if the invite doesn't exist do something more graceful than this
            abort(404);
        }

        return Inertia::render('Auth/RegisterInvitedUser/RegisterInvitedUser', [
            'email' => $invite->email,
            'token' => $invite->token,
            'organization_id' => $invite->organization_id,
        ]);
    }

    public function registerInvitedUser(Request $request): RedirectResponse
    {
        $invite = Invite::where('token', $request->token)->first();

        if (!$invite) {
            //if the invite doesn't exist do something more graceful than this
            abort(404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'organization_id' => $request->organization_id ? $request->organization_id : null,
            'password' => Hash::make($request->password),
        ]);

        if ($request->role) {
            $user->assignRole($request->role);
        } else {
            $user->assignRole('newuser-0');
        }

        $invite->delete();

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
