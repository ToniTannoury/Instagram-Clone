<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username');
            $table->string('name');
            $table->string('email')->unique();
            $table->text('password');
            $table->text('pic_url');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key to link with users
            $table->string('image_url');
            $table->integer('likes')->default(0);
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users');
        });
      
        {
            Schema::create('followers', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('follower_id'); // The user who follows
                $table->unsignedBigInteger('following_id'); // The user being followed
                $table->timestamps();
                
                $table->foreign('follower_id')->references('id')->on('users');
                $table->foreign('following_id')->references('id')->on('users');
            });
        }
        {
            Schema::create('likes', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id'); // The user who liked the post
                $table->unsignedBigInteger('post_id'); // The post being liked
                $table->timestamps();
                
                $table->foreign('user_id')->references('id')->on('users');
                $table->foreign('post_id')->references('id')->on('posts');
            });
        }
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
