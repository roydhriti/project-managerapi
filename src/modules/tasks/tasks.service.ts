import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(projectId: string, dto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        ...dto,
        projectId,
        createdBy: userId,
      },
    });
  }

  async findAll(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task deleted successfully' };
  }
}



// @Injectable()
// export class TasksService {
//   constructor(
//     @InjectModel(Task.name)
//     private taskModel: Model<Task>,
//   ) {}

//   async create(
//     projectId: string,
//     dto: CreateTaskDto,
//     userId: string,
//     ) {
//     return this.taskModel.create({
//         ...dto,
//         projectId: new Types.ObjectId(projectId),
//         createdBy: new Types.ObjectId(userId),
//     });
//     }

//     async findAll(projectId: string) {
//     return this.taskModel
//         .find({ projectId: new Types.ObjectId(projectId) })
//         .sort({ createdAt: -1 });
//     }

//   async update(id: string, dto: UpdateTaskDto) {
//     const task = await this.taskModel.findByIdAndUpdate(
//       id,
//       dto,
//       { returnDocument: 'after' },
//     );

//     if (!task) {
//       throw new NotFoundException('Task not found');
//     }

//     return task;
//   }

//   async remove(id: string) {
//     const task = await this.taskModel.findByIdAndDelete(id);

//     if (!task) {
//       throw new NotFoundException('Task not found');
//     }

//     return { message: 'Task deleted successfully' };
//   }
// }