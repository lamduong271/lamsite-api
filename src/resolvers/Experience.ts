import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Experience } from "../entities/Experiences";

@InputType()
class ExperienceInputType {
  @Field(() => String)
  company: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  duration: string;
}

@InputType()
class ExperienceInputUpdate {
  @Field({nullable: true})
  company?: string;

  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  location?: string;

  @Field({nullable: true})
  duration?: string;
}

@Resolver()
export class ExperienceResolver {
  @Query(() => [Experience])
  getAllExperiences() {
    return Experience.find();
  }

  @Query(() => Experience)
  async getExperienceById(
    @Arg("id") id: string,
  ): Promise<Experience> {
    const experience = await Experience.findOne({where: {id}})
    if(!experience) throw new Error("experience not found!");
    return experience
  }


  @Mutation(() => Experience)
  async createExperience(
    @Arg("inputExperience", () => ExperienceInputType)
    inputExperience: ExperienceInputType
  ): Promise<Experience> {
    return Experience.create({
      ...inputExperience
    }).save()
  }

  @Mutation(() => Experience)
  async updateExperience(
    @Arg("id") id: string,
    @Arg("experienceInputUpdate") experienceInputUpdate: ExperienceInputUpdate
  ): Promise<Experience> {
    const experience = await Experience.findOne({where: {id}})
    if(!experience) throw new Error("experience not found!");
    Object.assign(experience, experienceInputUpdate)
    await experience.save()
    return experience
  }

  @Mutation(() => Boolean)
  async deleteExperience(
    @Arg("id") id: string,
  ): Promise<boolean> {
    const experience = await Experience.findOne({where: {id}})
    if(!experience) throw new Error("experience not found!");
    await experience.remove()
    return  true;
  }
}
