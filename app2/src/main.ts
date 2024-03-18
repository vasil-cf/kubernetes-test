import fastify from 'fastify';

const VERSION = '2.0.0';

const server = fastify({logger: true});

server.get('/', async (request, reply) => {
    const app1Host = process.env.app1_host!;
    const app1Port = process.env.app1_port!;

    try {
        const response = await fetch(`http://${app1Host}:${app1Port}/`);
        const data = await response.json();
        return {hello: 'world from app2!', version: VERSION, data};
    } catch (err: any) {
        server.log.error(err);
        return {hello: 'world from app2!', version: VERSION, isError: true, details: err?.message!};
    }
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
