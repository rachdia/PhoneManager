import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { AgentService } from './agent.service';
import { Agent } from '../../entities/agent.entity';
import { JwtAuthGuard } from '../../components/user/jwt-auth.guard';
import { CreateAgentDto } from 'src/dto/createagent.dto';

@Controller('agent')
export class AgentController {
    constructor(private readonly agentService: AgentService) { }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async findAll(): Promise<Agent[]> {
        return this.agentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Agent> {
        return this.agentService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-agent')
    async create(@Body() agentData: CreateAgentDto): Promise<Agent> {
        return this.agentService.create(agentData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() agentData: Partial<Agent>): Promise<Agent> {
        return this.agentService.update(id, agentData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.agentService.remove(id);
    }

    @Get('filter')
    async findwithPagination(@Query('page') page: number, @Query('limit') limit: number) {
        return await this.agentService.findwithPagination(page, limit);
    }

    @Get('filter-by-name')
    async findByFullName(@Query('name') name: string): Promise<Agent[]> {
        return await this.agentService.findByFullName(name);
    }

    @Get('sum')
    async sumOfAgents() {
        let sum = await this.agentService.sumOfAgents();
        if (sum > 2) {
            return sum
        }
        throw new BadRequestException('no sum ')
    }
}
