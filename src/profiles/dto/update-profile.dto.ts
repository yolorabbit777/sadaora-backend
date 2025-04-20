import { IsString, IsUrl, IsArray, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  profileImageUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  interests?: string[];
}
