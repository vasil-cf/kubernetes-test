import fastify from 'fastify';

const VERSION = '2.0.0'

const server = fastify({logger: true});

server.get('/', async (request, reply) => {
    return {
        hello: 'world',
        version: VERSION
    };
});

const start = async () => {
    try {
        const port = process.env.port!;
        const host = process.env.host!;
        await server.listen({port: Number(port), host});
        console.log(`Version: ${VERSION}. Server is listening on ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
