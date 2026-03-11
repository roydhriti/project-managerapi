import { Controller, Get, Post, Body, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';


@ApiTags('Projects')
@ApiBearerAuth()
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() body: ProjectDto, @Req() req: any) {
        return this.projectsService.create(
        body.projectName,
        body.description,
        req.user.userId,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req: any) {
        return this.projectsService.findAll(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
        update(
        @Param('id') id: string,
        @Body() body: UpdateProjectDto,
        @Req() req: any,
        ) {
        return this.projectsService.update(id, req.user.userId, body);
    }
    @Delete(':id')
        remove(@Param('id') id: string, @Req() req: any) {
        return this.projectsService.remove(id, req.user.userId);
    }
}