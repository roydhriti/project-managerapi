import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<Project>,
  ) {}

  async create(projectName: string, description: string, userId: string) {
    return this.projectModel.create({
      projectName,
      description,
      createdBy: new Types.ObjectId(userId),
    });
  }

  async findAll(userId: string) {
    return this.projectModel
        .find({ createdBy: new Types.ObjectId(userId) })
        .sort({ createdAt: -1 });
    }

  async update(id: string, userId: string, data: Partial<Project>) {
    const project = await this.projectModel.findOneAndUpdate(
        {
        _id: new Types.ObjectId(id),
        createdBy: new Types.ObjectId(userId),
        },
        data,
        { new: true },
    );

    if (!project) {
        throw new NotFoundException('Project not found');
    }

    return project;
    }

  async remove(id: string, userId: string) {
    const project = await this.projectModel.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });

    if (!project) throw new NotFoundException('Project not found');

    return { message: 'Deleted successfully' };
  }
}