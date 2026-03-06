import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>,
  ) {}

  async create(
    projectId: string,
    dto: CreateTaskDto,
    userId: string,
    ) {
    return this.taskModel.create({
        ...dto,
        projectId: new Types.ObjectId(projectId),
        createdBy: new Types.ObjectId(userId),
    });
    }

    async findAll(projectId: string) {
    return this.taskModel
        .find({ projectId: new Types.ObjectId(projectId) })
        .sort({ createdAt: -1 });
    }

  async update(id: string, dto: UpdateTaskDto) {
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      dto,
      { returnDocument: 'after' },
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return { message: 'Task deleted successfully' };
  }
}