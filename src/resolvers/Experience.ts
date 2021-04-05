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

@Resolver()
export class ExperienceResolver {
  @Query(() => [Experience])
  getAllExperiences() {
    return Experience.find();
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
}
