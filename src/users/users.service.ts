import { PrismaService } from '@app/prisma';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'utils/bcrypt';
import { FindUser } from './dto/find-user.dto';
import { RevertTransfer } from 'src/transfer/dto/revert-transfer.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async cadastro(userDto: CreateUserDto) {
        const existUser = await this.prisma.user.findUnique({
            where:{
                email:userDto.email
            }
        })

        const hashedPassword = await hashPassword(userDto.password)

        try {
            if(existUser){
                return {
                    message: 'Usuário ja existe',
                    success: false,
                    status: HttpStatus.CONFLICT,
                }
            }
            
            const user = await this.prisma.user.create({
                data: {
                    
                    name: userDto.name,
                    email: userDto.email,
                    password: hashedPassword,
                    
                },
            });
            
            await this.prisma.balance.create({
                data: {
        
                    user_id: user.id,
        
                }
                })
            
            return {
                message: 'Usuário criado com sucesso!<3',
                success: true,
                data: {
                    
                    name: user.name,
                    email: user.email,
                    
                }
            };
        } catch (error) {
            throw error; // Propaga o erro para o controller tratar
        }
    }
    async findUser(findUser: FindUser) {
        
        try {
            const foundUser = await this.prisma.user.findUnique({

                where:{email:findUser.email}

            })
            if(!foundUser){
                return{
                    success:false,
                    message: 'Não tem porra nehuma seu aqui!',
                    status: HttpStatus.NOT_FOUND
                }
            }
            return {
                succes: true,
                data: {
                    name: foundUser.name,
                    email: foundUser.email,
                }
            }
        } catch (error) {
            
        }

    }
}