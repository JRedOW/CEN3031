# Study Buddy

## Install and Setup

### Install Yarn Dependencies

```bash
yarn install
```

### Install Godot Editor

Run the following commands in the directory

```bash
mkdir Godot && cd Godot

curl -o Godot.zip -L https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_linux.x86_64.zip
unzip Godot.zip
mv Godot_v4.4-stable_linux.x86_64 godot
chmod +x godot

curl -o export_templates.tpz -L https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_export_templates.tpz
unzip -j export_templates.tpz -d /home/node/.local/share/godot/export_templates/4.4.stable/
```

### Build the Character Engine

To build the character engine, make sure you are still in the `Godot/` directory and run:

```bash
mkdir ../static/character_engine
./godot --path "../character_engine" --headless --export-release "Web" ../static/character_engine/character_engine.html
```

## Database

First, create a `.env` file, likely copied from the `.env.example` file.

To start the database, create a new terminal and start the database:

```bash
yarn db:start
```

Now to migrate the database, migrate the database in the original terminal:

```bash
yarn db:push
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
