import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    IsDateString,
  } from 'class-validator';
  
  export class SignupDto {
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @Length(6, 24)
    password: string;
  
    @IsDateString()
    dob: string;
  
    @IsString()
    phoneNumber: string;
  
    @IsString()
    gender: string;
  }
  