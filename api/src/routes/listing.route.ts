
import create from '@/controllers/listing/create.controller';
import deleteListing from '@/controllers/listing/delete.controller';
import getAllListing from '@/controllers/listing/getAllListing.controller';
import getSingleListing from '@/controllers/listing/getSingleListing.controller';
import update from '@/controllers/listing/update.controller';
import express from 'express';
const listingRouter = express.Router();

listingRouter.post("/", create)
listingRouter.put(":id", update)
listingRouter.delete(":id", deleteListing)
listingRouter.get(":id", getSingleListing)
listingRouter.get("/", getAllListing)

export default listingRouter;