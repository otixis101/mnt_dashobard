// eslint-disable-next-line import/no-cycle
import { PriceCardProps } from "./index";

const PLANS: Record<PriceCardProps["plan"], Array<string>> = {
  free: [
    " Create, update & save family tree",
    "Upload family photos/ documents",
    "Manage Account",
    "Email Support",
    "Bank-grade security",
  ],
  premium: [
    " Everything in the free plan ",
    "Invite and collaborate with family members",
    "Central photo-sharing repository for all family members",
    "Limit who can view your family tree (privacy toggle )",
    "Unlimited file storage ",
    "Explore/ search other family trees",
    "Private vault ",
  ],
};
export default PLANS;
