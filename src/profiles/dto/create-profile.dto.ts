import {
  IsString,
  IsUrl,
  IsArray,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  bio: string;

  @IsUrl()
  @IsNotEmpty()
  profileImageUrl: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  interests: string[];
}
