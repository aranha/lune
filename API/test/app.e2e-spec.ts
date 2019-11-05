import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { async } from 'rxjs/internal/scheduler/async';

describe('Teste backend (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Testando rota /user', () => {
    it('/user (GET) Retorna todos os usuários',async () => {
      const response = await request(app.getHttpServer())
        .get('/user/')
        .expect(200);

        expect(response.text).toContain("Teste");
        //.expect('');
    });
    
    it('/user/id (GET) Busca um usuário por id', () => {
      return request(app.getHttpServer())
        .get('/user/5d93de501960c2659381bfdf')
        .expect(200);
        //.expect('');
    });
  
    it('/user/mail/:email (GET) Busca um usuário por email', () => {
      return request(app.getHttpServer())
        .get('/user/mail/teste@teste.com')
        .expect(200);
        //.expect('');
    });
  
    // it('/ (GET) não encontra um usuário por email', () => {
    //   return request(app.getHttpServer())
    //     .get('/user/mail/falso@teste.com')
    //     .expect(404);
    //     //.expect('');
    // });
    // Não há tratamento dos codigos de respostas html, só há tratamento se for erro de conecxão com o banco. 
    //Por ex.: Verificar se o restorno do banco for nulo, retornar um 404 ao invés de um 200
  });

  describe('Testando rota /event', () => {
  
    it('/event (GET) Busca eventos', () => {
      return request(app.getHttpServer())
        .get('/event')
        .expect(200);
        //.expect('');
    });
  
  
    it('/event/id (GET) Busca eventos por id que não existe', () => {
      return request(app.getHttpServer())
        .get('/event/id/132456')
        .expect(404);
        
    });

  
  });

});

