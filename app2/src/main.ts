import fastify from 'fastify';

const server = fastify({logger: true});

server.get('/', async (request, reply) => {
    return {hello: 'world from app2!'};
});

const start = async () => {
    try {
        const port = process.env.port!;
        const host = process.env.host!;
        await server.listen({port: Number(port), host});
        console.log(`Server is listening on ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
