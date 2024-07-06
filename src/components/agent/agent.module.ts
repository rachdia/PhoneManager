
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from '../../entities/agent.entity';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';

@Module({
    imports: [TypeOrmModule.forFeature([Agent])],
    controllers: [AgentController],
    providers: [AgentService],
})
export class AgentModule { }
