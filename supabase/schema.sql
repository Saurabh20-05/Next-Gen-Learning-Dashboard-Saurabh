create table if not exists courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null check (progress >= 0 and progress <= 100),
  icon_name   text not null,
  created_at  timestamptz not null default now()
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',   75, 'Atom'),
  ('System Design Fundamentals', 48, 'Network'),
  ('TypeScript Deep Dive',       90, 'Code2'),
  ('Database Architecture',      31, 'Database');

alter table courses enable row level security;

create policy "Public read access"
  on courses for select
  using (true);
