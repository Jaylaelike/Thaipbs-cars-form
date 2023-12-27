import {db} from '../../lib/db';
// import {User} from '@prisma/client';
import { NextResponse } from 'next/server';
import {hash} from 'bcrypt';
import * as z from 'zod';

//Define a schema for inout validate
const userSchema = z.object({
    email: z.string().email('Invalid Email').min(1, 'Email is requiered').max(100),
    password: z.string().min(1, 'Password is requiered').min(8, 'Password must be at least 8 characters'),
    // confirmPassword: z.string().min(1, 'Confirm Password is requiered').min(8, 'Confirm Password must be at least 8 characters'),
    username: z.string().min(1, 'Username is requiered').max(100),
    employeeId: z.string().min(1, 'Employee ID is requiered').max(10),

    // status: z.enum(['Admin', 'user'])
   
});
// .refine(data => data.password === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword'],
// });

export async function POST(req: Request ) {

    try {
        const body = await req.json();
        const {email, password, username, employeeId} = userSchema.parse(body);

        ///check if email already exists
        const existsUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if(existsUserByEmail) {
            return NextResponse.json({user:null, message: 'Emails already exists'}, { status: 409});
        }

          ///check if username already exists
          const existsUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if(existsUserByUsername) {
            return NextResponse.json({user:null, message: 'Username already exists'}, { status: 409});
        }


       // const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                email,
                password,  // password: hashedPassword,
                username,
                employeeId


            }
        });

        const {password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({user: rest, message: "User create succeessfully"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something its wrong!!!"}, { status: 500 });
    }
}