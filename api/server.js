const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const contactRouter = require("./items/router");

const PORT = process.env.PORT;

// server class

module.exports = class ContactServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleWares();
    this.initRoutes();
    await this.initDB();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleWares() {
    this.server.use(express.json());
  }

  initRoutes() {

    this.server.use("/api/contacts", contactRouter);
  }

  async initDB() {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log(`Ala Pugacheva app listening at http://localhost:${PORT}`);
    });
  }
};

// const express = require("express");
// const mongoose = require("mongoose");
// const contactRouter = require("./contacts/Contact.router");
// require("dotenv").config();

// module.exports = class ContactServer {
//   constructor() {
//     this.server = null;
//   }

//   async start() {
//     this.initServer();
//     this.initMiddleWares();
//     this.initRoutes();
//     await this.initDB();
//     this.startListening();
//   }

//   initServer() {
//     this.server = express();
//   }
//   initMiddleWares() {
//     this.server.use(express.json);
//   }
//   initRoutes() {
//     this.server.use("/api/contacts/", contactRouter);
//   }

//   async initDB() {
//     await mongoose.connect(
//       "mongodb+srv://burzumane:GjvCcBgwAS5iYdbs@cluster0.zrstr.mongodb.net/db-contacts?retryWrites=true&w=majorityre",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: true,
//       },
//     );
//   }
//   startListening() {
//     const PORT = 5005;
//     return this.server.listen(PORT, () => {
//       console.log(`Example app listening at http://localhost:${PORT}`);
//     });
//   }
// };
