import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@nx-nestjs/common';
import { UserDocument } from '../../../../common/src/lib/models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UsersRepository.name);

    constructor(
        @InjectModel(UserDocument.name)
        private readonly userModel: Model<UserDocument>
    ) {
        super(userModel);
    }
}
