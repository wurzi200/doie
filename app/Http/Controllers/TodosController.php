<?php

namespace App\Http\Controllers;

use App\Models\Todos;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

use function Laravel\Prompts\alert;

class TodosController extends Controller
{
    public function index()
    {
        $todos = Todos::where('user_id', Auth::id())->orderByDesc('status')->get();

        return Inertia::render('Todos/All', [
            'todos' => $todos
        ]);
    }

    public function add(Request $request): RedirectResponse
    {
        $request->validate([
            'description' => 'required',
            'priority' => 'nullable',
            'status' => 'nullable'
        ]);

        $todos = new Todos;
        $todos->user_id = Auth::id();
        $todos->description = $request->input('description');
        $todos->priority = 1;
        $todos->status = 'open';
        $todos->save();

        return Redirect::route('todos.index')->with('status', 200);
    }

    public function update(Request $request): RedirectResponse
    {
        $id = $request->id;
        $status = $request->status;
        $newStatus = '';

        if ($status == 'done') {
            $newStatus = 'open';
        } else {
            $newStatus = 'done';
        }

        Todos::where('id', $id)->update(['status' => $newStatus]);

        return Redirect::route('todos.index')->with('status', 200);
    }

    public function delete(Request $request): RedirectResponse
    {
        $id = $request->id;
        Todos::where('id', $id)->delete();

        return Redirect::route('todos.index')->with('status', 200);
    }
}
