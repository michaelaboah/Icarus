import { MyContext } from "../@types/resolverTypes";
import { Post } from "../entities/Post";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(@Ctx() { em }: MyContext): Promise<Post[]> {
        return em.find(Post, {})
    }

    @Query(() => Post, { nullable: true})
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id })
    }

    @Mutation(() => Post)
    async createPost(
            @Arg("title", () => String) title: string, 
            @Ctx() { em }: MyContext
        ): Promise<Post | null> {
        const post = em.create(Post, { title, searchableTitle: title })
        await em.persistAndFlush(post)
        return em.findOne(Post, { title })
    }

    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id", () => Int) id: number,
        @Ctx() { em }: MyContext
    ){
        await em.nativeDelete(Post, { id })
        return true
    }

    @Mutation(() => Boolean)
    async deletePosts(
        @Arg("ids", () => [Int]) ids: number[],
        @Ctx() { em }: MyContext
    ): Promise<boolean> {
        ids.forEach((id) => em.nativeDelete(Post, { id }))
        return true
    }

    @Query(() => [Post])
    search(
        @Arg("searchTitle", () => String) searchTitle: string,
        @Ctx() { em }: MyContext
    ){
        return em.find(Post, { title: {$fulltext: searchTitle}})
    }
}