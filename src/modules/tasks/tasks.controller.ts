import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('projects/:projectId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}


    @UseGuards(JwtAuthGuard)
    @Post()
    create(
    @Param('projectId') projectId: string,
        @Body() dto: CreateTaskDto,
        @Req() req: any,
    ) {
    return this.tasksService.create(
        projectId,
        dto,
        req.user.userId,
    );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Param('projectId') projectId: string) {
    return this.tasksService.findAll(projectId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':taskId')
    update(
        @Param('taskId') taskId: string,
        @Body() dto: UpdateTaskDto,
    ) {
        return this.tasksService.update(taskId, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':taskId')
    remove(@Param('taskId') taskId: string) {
        return this.tasksService.remove(taskId);
    }
}