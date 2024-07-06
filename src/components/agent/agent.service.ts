import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Agent } from '../../entities/agent.entity';
import { CreateAgentDto } from 'src/dto/createagent.dto';

@Injectable()
export class AgentService {
    constructor(
        @InjectRepository(Agent)
        private readonly agentRepository: Repository<Agent>,
    ) { }

    async findAll(): Promise<Agent[]> {
        return await this.agentRepository.find();
    }

    async findOne(id: number): Promise<Agent> {
        return await this.agentRepository.findOne({ where: { id } });
    }

    async create(createAgentDto: CreateAgentDto): Promise<Agent> {
        const { fullName, phoneNumber, email, destinationGroup, registrationDate, canMakeCalls, photo } = createAgentDto;
        const existingAgent = await this.agentRepository.findOne({ where: { email } });
        if (existingAgent) {
            throw new BadRequestException('Email address already in use');
        }
        const newAgent = this.agentRepository.create({
            fullName,
            phoneNumber,
            email,
            destinationGroup,
            registrationDate,
            canMakeCalls,
            photo,
        });
        return await this.agentRepository.save(newAgent);
    }

    async update(id: number, agentData: Partial<Agent>): Promise<Agent> {
        await this.agentRepository.update(id, agentData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.agentRepository.delete(id);
    }

    async findwithPagination(page: number, limit: number): Promise<Agent[]> {
        console.log(`Finding agents for page ${page} with limit ${limit}`);
        const agents = await this.agentRepository
            .createQueryBuilder('agent')
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();

        return agents;
    }

    async findByFullName(name: string): Promise<Agent[]> {
        return await this.agentRepository.find({
            where: {
                fullName: Like(`%${name}%`),
            },
        });
    }

    async sumOfAgents(): Promise<number> {
        const agents = await this.agentRepository.find();
        const sum = agents.reduce((total, agent) => {
            return total + Number(agent.id);
        }, 0);
        return sum;
    }
}
