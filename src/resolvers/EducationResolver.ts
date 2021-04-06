import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Education } from "../entities/Education";

@InputType()
class EducationInputType {
  @Field(() => String)
  schoolName: string;

  @Field(() => String)
  degree: string;

  @Field(() => String)
  major: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}

@InputType()
class EducationInputUpdateType {
  @Field(() => String)
  schoolName?: string;

  @Field(() => String)
  degree?: string;

  @Field(() => String)
  major?: string;

  @Field(() => String)
  location?: string;

  @Field(() => String)
  startDate?: string;

  @Field(() => String)
  endDate?: string;
}

@Resolver()
export class EducationResolver {
  @Query(() => [Education])
  async getAllEducations(): Promise<Education[]> {
    return await Education.find();
  }

  @Query(() => Education)
  async getEducationById(@Arg("id") id: string): Promise<Education> {
    const education = Education.findOne({ where: { id } });
    if (!education) throw new Error("education not found!");
    return education;
  }

  @Mutation(() => Education)
  async createEducation(
    @Arg("educationInput", () => EducationInputType)
    educationInput: EducationInputType
  ): Promise<Education> {
    return Education.create({
      ...educationInput
    }).save()
  }

  @Mutation(() => Education)
  async updateEducation(
    @Arg("educationUpdateInput", () => EducationInputUpdateType) educationUpdateInput: EducationInputUpdateType,
    @Arg("id") id: string
  ): Promise<Education> {
      const education = await Education.findOne({where: {id}})
      if (!education) throw new Error("education not found!");
      Object.assign(education, educationUpdateInput)
      await education.save()
      return education
    }

    @Mutation(() => Boolean)
    async deleteEducation(
      @Arg("id") id: string,
    ): Promise<boolean> {
      const education =  await Education.findOne({where: {id}})
      if(!education) throw new Error("education not found!");
      await education.remove()
      return  true;
    }
}
