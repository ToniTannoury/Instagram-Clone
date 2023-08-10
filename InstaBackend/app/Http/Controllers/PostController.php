<?php
// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Post;
// use Illuminate\Support\Facades\Auth;

// class PostController extends Controller
// {
//     public function createPost(Request $request)
//     {
//         $user = $request->user();
        
        
        
        
//         if ($request->hasFile('image_url')) {
//             error_log(112); 
//             $uploadedFile = $request->file('image_url');
//             $name = $uploadedFile->getClientOriginalName();
//             $uploadedFile->move(public_path('images'), $name);
//             $post = new Post([
//                 'user_id' => $user->id,
//                 'image_url' => $name,
//                 'likes'=>0
//             ]);
            
//             $post->posts()->save($post);
            
//             return response()->json([
//                 'message' => 'User created successfully',
//                 'data' => $post,
//             ], 201);
//         }
//         return response()->json(['message' => 'Post not created']);
//     }
//     public function like(Post $post)
//     {
//         $user = Auth::user();
    
//         if (!$post->likedBy($user)) {
//             $post->likes()->create(['user_id' => $user->id]);

//             $post->increment('likes');
    
//             return response()->json(['message' => 'Post liked']);
//         }
    
//         return response()->json(['message' => 'Post already liked by this user']);
//     }
    

//     public function unlike(Post $post)
// {
//     $user = Auth::user();

//     if ($post->likedBy($user)) {
//         $post->likes()->where('user_id', $user->id)->delete();
//         $post->decrement('likes');

//         return response()->json(['message' => 'Post unliked']);
//     }

//     return response()->json(['message' => 'Post not liked by this user']);
// }

//     public function checkLiked(Post $post)
// {
//     $user = Auth::user();

//     if ($post->likedBy($user)) {
//         return response()->json(['liked' => true]);
//     } else {
//         return response()->json(['liked' => false]);
//     }
// }
// }

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Exception;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function createPost(Request $request)
{
    $user = $request->user();

    if ($request->hasFile('image_url')) {
        try {
            $uploadedFile = $request->file('image_url');
            $name = $uploadedFile->getClientOriginalName();
            $uploadedFile->move(public_path('images'), $name);

            $post = new Post([
                'user_id' => $user->id,
                'image_url' => $name,
                'likes' => 0,
            ]);

            $user->posts()->save($post);

            return response()->json([
                'message' => 'Post created successfully',
                    'data' => $post,
            ], 201);
        } catch (Exception $e) {
            error_log('Exception: ' . $e->getMessage());
            return response()->json(['message' => 'Error creating post'], 500);
        }
    }

    return response()->json(['message' => 'Post not created']);
}

    public function like(Post $post)
    {
        $user = Auth::user();
    
        if (!$post->likedBy($user)) {
            $post->likes()->create(['user_id' => $user->id]);

            $post->increment('likes');
    
            return response()->json(['message' => 'Post liked']);
        }
    
        return response()->json(['message' => 'Post already liked by this user']);
    }
    

    public function unlike(Post $post)
{
    $user = Auth::user();

    if ($post->likedBy($user)) {
        $post->likes()->where('user_id', $user->id)->delete();
        $post->decrement('likes');

        return response()->json(['message' => 'Post unliked']);
    }

    return response()->json(['message' => 'Post not liked by this user']);
}

    public function checkLiked(Post $post)
{
    $user = Auth::user();

    if ($post->likedBy($user)) {
        return response()->json(['liked' => true]);
    } else {
        return response()->json(['liked' => false]);
    }
}

}
