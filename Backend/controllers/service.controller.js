import Business from "../models/Business.js";
import Service from "../models/Service.js";

export const createService = async (req, res) => {
  try {
    const { businessId } = req.body;
    const user = req.user;

    if (!businessId) {
      return res
        .status(400)
        .json({ message: "Business ID is required", success: false });
    }

    const business = await Business.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ message: "Business not found", success: false });
    }

    if (business.facility !== "service") {
      return res
        .status(400)
        .json({ message: "Your facility is not serviced", success: false });
    }

    const service = new Service({ business: businessId, owner: user._id });
    await service.save();

    business.services.push(service._id);
    await business.save();

    user.services.push(service._id);
    await user.save();

    res.status(201).json({ message: { service }, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const updateServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { serviceId } = req.params;

    const allowedTransitions = {
      pending: ["approved", "rejected"],
      approved: ["progress", "rejected"],
      progress: ["completed"],
      completed: [],
      rejected: [],
    };

    const service = await Service.findById(serviceId);
    if (!service || service.isDeleted)
      return res
        .status(404)
        .json({ message: "Service not found", success: false });

    const previousStatus = service.status;
    if (!allowedTransitions[previousStatus].includes(status)) {
      return res.status(400).json({
        message: `Invalid status transition from '${previousStatus}' to '${status}'`,
        success: false,
      });
    }

    service.status = status;
    await service.save();
    res.status(200).json({ message: { service }, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    if (!serviceId) {
      return res
        .status(404)
        .json({ message: "Service not found", success: false });
    }
    const service = await Service.findById(serviceId);
    if (!service || service.isDeleted)
      return res
        .status(404)
        .json({ message: "Service not found", success: false });

    service.isDeleted = true;
    await service.save();

    res.json({ message: "Service deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
