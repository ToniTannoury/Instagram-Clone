<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function createPost(Request $request)
    {
        $user = $request->user();
        
        $post = new Post([
            'user_id' => $user->id,
            'image_url' => $request->input('image_url'),
        ]);
        
        $user->posts()->save($post);
        
        return response()->json(['message' => 'Post created successfully',"post"=>$post]);
    }
    public function like(Post $post)
{
    $user = Auth::user();
    if (!$post->likedBy($user)) {
        $post->likes()->create(['user_id' => $user->id]);
    }
    return response()->json(['message' => 'Post liked']);
}

public function unlike(Post $post)
{
    $user = Auth::user();
    $post->likes()->where('user_id', $user->id)->delete();
    return response()->json(['message' => 'Post unliked']);
}
}
