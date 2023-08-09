<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

//Authenticated APIS
Route::group(["middleware" => "auth:api"], function(){
    $user = Auth::user(); 
    
    // Route::group(["middleware" => "auth.admin"], function(){
    //     Route::get("trust_issues", [AuthController::class, "issues"]);
    // });

    Route::group(["prefix" => "user"], function(){
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
        Route::get('following-posts', [UserController::class, "followingPosts"]);
        Route::get('following-pictures', [UserController::class,"followingPictures"]);
        Route::get('get-profile', [UserController::class,"getProfile"]);
        Route::get('get-followings', [UserController::class,"getFollowing"]);
        Route::get('get-followers', [UserController::class,"getFollowers"]);
        Route::get('get-posts', [UserController::class,"getPosts"]);
        Route::get('search-users',[UserController::class,"searchUsers"]);
        Route::post('follow-user/{user}', [UserController::class,"followUser"]);
        Route::delete('unfollow-user/{user}', [UserController::class,"unfollowUser"]);
        Route::post('create-post', [PostController::class , "createPost"]);
        Route::post('/posts/{post}/like', [PostController::class , "like"]);
        Route::delete('/posts/{post}/like', [PostController::class , "unlike"]);
    });

});


Route::group(["prefix" => "guest"], function(){
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});


