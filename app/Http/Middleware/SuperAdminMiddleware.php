<?php

namespace App\Http\Middleware;

use App\Http\Controllers\PermissionsController;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Response;

//Change WHOLE PERMISSION THINGY

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if ($user->role_id == 4) {
            return $next($request);
        } else {
            // abort(403, 'Wrong Accept Header');
            return Redirect::to('/');
        }
    }
}
