# Examba dashboard

To get started run:

```bash
yarn install
yarn dev
```

For the MongoDB connection to work make sure MongoDB is running on the cluster and you have forwarded the connection port to you local machine.

```bash
ssh -fN user@147.83.46.71 -p 5967 -L 27017:localhost:27017
```

Forwards port 27017 on IP 147.83.46.71:5967 port 27017 to your port 27017.
