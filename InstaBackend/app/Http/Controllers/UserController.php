<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function followingPictures(Request $request)
{
    $user = $request->user();
    $followingIds = $user->following()->pluck('users.id'); // Specify the table alias for id

    $followingPictures = User::whereIn('users.id', $followingIds)
        ->with(['posts' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])
        ->get();

    return response()->json(['following_pictures' => $followingPictures]);
}

public function searchUsers(Request $request)
{
    $query = $request->input('query');

    if (empty($query)) {
        return response()->json(['users' => []]); // Return an empty array
    }

    $users = User::where('name', 'LIKE', "%$query%")
        ->orWhere('username', 'LIKE', "%$query%")
        ->get();

    return response()->json(['users' => $users]);
}



public function followUser(Request $request, User $user)
{
    $currentUser = $request->user();

    
    if ($currentUser->following->contains($user)) {
        return response()->json(['error' => 'User is already followed'], 400);
    }

    $currentUser->following()->syncWithoutDetaching($user);

    return response()->json(['message' => 'User followed successfully', "user" => $user]);
}


    public function unfollowUser(Request $request, User $user)
    {
        $currentUser = $request->user();
        $currentUser->following()->detach($user);

        return response()->json(['message' => 'User unfollowed successfully' , "user"=>$user]);
    }

    public function getProfile(Request $request)
    {
        $currentUser = $request->user();

        return response()->json(['user' =>  $currentUser]);
    }
    public function getFollowers(Request $request)
    {
        $followers = $request->user()->followers;

        return response()->json(['followers' =>  $followers]);
    }
    public function getFollowing(Request $request)
    {
        $followings = $request->user()->following;

        return response()->json(['followings' =>  $followings]);
    }
    public function getPosts(Request $request)
    {
        $followings = $request->user()->posts;

        return response()->json(['posts' =>  $followings]);
    }
}
