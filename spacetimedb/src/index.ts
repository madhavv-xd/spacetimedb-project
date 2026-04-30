import { schema, table, t } from 'spacetimedb/server';

const spacetimedb = schema({
  message: table(
    { public: true },
    {
      id: t.u64(),
      sender: t.string(),
      text: t.string(),
      sentAt: t.u64(),
    }
  ),
  user: table(
    { public: true },
    {
      identity: t.identity(),
      username: t.string(),
      online: t.bool(),
    }
  ),
});

export default spacetimedb;

export const sendMessage = spacetimedb.reducer(
  { text: t.string(), sender: t.string() },
  (ctx, { text, sender }) => {
    ctx.db.message.insert({
      id: BigInt(Date.now()),
      sender,
      text,
      sentAt: BigInt(Date.now()),
    });
  }
);

export const setUsername = spacetimedb.reducer(
  { username: t.string() },
  (ctx, { username }) => {
    ctx.db.user.insert({
      identity: ctx.identity,
      username,
      online: true,
    });
  }
);