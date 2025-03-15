# Study Buddy

## Install and Setup

### Install Yarn Dependencies

```bash
yarn install
```

### Install Godot Editor

Run the following in the `/Godot/` directory:

```bash
chmod +x build.sh install.sh

./install.sh
```

### Build the Character Engine

To build the character engine, make sure you are still in the `/Godot/` directory and run:

```bash
./build.sh
```

## Database

First, create a `.env` file, likely copied from the `.env.example` file using `cp .env.example .env` ran in the root.

To start the database, create a new terminal and start the database:

```bash
yarn db:start
```

Now to migrate the database, generate and confirm the migrations for the database in the original terminal:

```bash
yarn db:push
```

## Developing

Once you have installed and setup everything, start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of the app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.
