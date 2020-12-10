package com.denlir.pos.service.domain;

import com.denlir.pos.entity.domain.User;
import com.denlir.pos.payload.BaseMapper;
import com.denlir.pos.payload.domain.UserPayload;
import com.denlir.pos.repository.domain.UserRepository;
import com.denlir.pos.service.BasicServiceOperation;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BasicServiceOperation<User, UserPayload, UserRepository> {

    protected UserService(BaseMapper<User, UserPayload> mapper, UserRepository repository) {
        super(mapper, repository);
    }

}
