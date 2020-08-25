<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Transaction;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    //

    /**
     *
     * User API Functions - Login, Register, Logout
     *
     */
    function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        try {
            if (!$token = JWTAuth::attempt([
                'email' => request('email'),
                'password' => request('password')
            ])) {
                return response()->json(['status' => 'failed', 'error' => 'invalid credentials'], 422);
            }
        } catch (JWTException $e) {
            return response()->json(['status' => 'failed', 'error' => 'Could not create token'], 500);
        }

        $user = auth()->user();

        $lastLogin = $user->last_login;
        $now = Carbon::now();

        if ($lastLogin !== null && (($lastLogin->year == ($now->year) && $lastLogin->month < ($now->month)) || ($lastLogin->year < ($now->year)))) {
            $categories = Categories::where('user_id', '=', $user->id)->get();
            foreach ($categories as $category) {
                $buffBudget = $category->budget;
                $latestMonth = array_key_last($buffBudget);
                $month = $now->month;
                $year = $now->year;
                $currDate = $month . '/' . $year;
                $buffBudget[$currDate] = (float)$buffBudget[$latestMonth];
                $category->budget = $buffBudget;
                $category->save();
            }
        }

        $user->last_login = $now;
        $user->save();

        $status = 'success';

        $results = [
            'user' => $user
        ];

        return response()->json(compact('status', 'token', 'results'));
    }

    function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid input, please try again'
            ], 422);
        }

        $existing = User::where('email', '=', request('email'))->first();

        if ($existing) {
            return response()->json(['status' => 'failed', 'error' => 'A user with this email already exists.'], 422);
        }

        $user = new User();
        $user->email = request('email');
        $user->password = \bcrypt(request('password'));
        $user->save();

        $token = JWTAuth::attempt([
            'email' => request('email'),
            'password' => request('password')
        ]);

        $budgetDate = Carbon::now()->format('m/Y');

        $newBudget = array($budgetDate => (float)1000.00);

        Categories::create(["user_id" => auth()->user()->id, "category_title" => "Food", "budget" => $newBudget]);
        Categories::create(["user_id" => auth()->user()->id, "category_title" => "Others", "budget" => $newBudget]);

        $status = "success";
        return response()->json([
            'status' => $status,
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token
        ], 201);
    }
}
