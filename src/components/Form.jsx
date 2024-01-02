import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const initialFormState = {
  name: "",
  sectors: [],
  agreed: false,
};

const options = [
  { spacing: 0, label: "Manufacturing", value: "1" },
  { spacing: 4, label: "Construction materials", value: "19" },
  { spacing: 4, label: "Electronics and Optics", value: "18" },
  { spacing: 4, label: "Food and Beverage", value: "6" },
  { spacing: 8, label: "Bakery & confectionery products", value: "342" },
  { spacing: 8, label: "Beverages", value: "43" },
  { spacing: 8, label: "Fish & fish products", value: "42" },
  { spacing: 8, label: "Meat & meat products", value: "40" },
  { spacing: 8, label: "Milk & dairy products", value: "39" },
  { spacing: 8, label: "Other", value: "437" },
  { spacing: 8, label: "Sweets & snack food", value: "378" },
  { spacing: 4, label: "Furniture", value: "13" },
  { spacing: 8, label: "Bathroom/sauna", value: "389" },
  { spacing: 8, label: "Bedroom", value: "385" },
  { spacing: 8, label: "Children’s room", value: "390" },
  { spacing: 8, label: "Kitchen", value: "98" },
  { spacing: 8, label: "Living room", value: "101" },
  { spacing: 8, label: "Office", value: "392" },
  { spacing: 8, label: "Other (Furniture)", value: "394" },
  { spacing: 8, label: "Outdoor", value: "341" },
  { spacing: 8, label: "Project furniture", value: "99" },
  { spacing: 4, label: "Machinery", value: "12" },
  { spacing: 8, label: "Machinery components", value: "94" },
  { spacing: 8, label: "Machinery equipment/tools", value: "91" },
  { spacing: 8, label: "Manufacture of machinery", value: "224" },
  { spacing: 8, label: "Maritime", value: "97" },
  { spacing: 12, label: "Aluminium and steel workboats", value: "271" },
  { spacing: 12, label: "Boat/Yacht building", value: "269" },
  { spacing: 12, label: "Ship repair and conversion", value: "230" },
  { spacing: 8, label: "Metal structures", value: "93" },
  { spacing: 8, label: "Other", value: "508" },
  { spacing: 8, label: "Repair and maintenance service", value: "227" },
  { spacing: 4, label: "Metalworking", value: "11" },
  { spacing: 8, label: "Construction of metal structures", value: "67" },
  { spacing: 8, label: "Houses and buildings", value: "263" },
  { spacing: 8, label: "Metal products", value: "267" },
  { spacing: 8, label: "Metal works", value: "542" },
  { spacing: 12, label: "CNC-machining", value: "75" },
  { spacing: 12, label: "Forgings,Fasteners", value: "62" },
  { spacing: 12, label: "Gas,Plasma, Laser cutting", value: "69" },
  { spacing: 12, label: "MIG,TIG, Aluminum welding", value: "66" },
  { spacing: 4, label: "Plastic and Rubber", value: "9" },
  { spacing: 8, label: "Packaging", value: "54" },
  { spacing: 8, label: "Plastic goods", value: "556" },
  { spacing: 8, label: "Plastic processing technology", value: "559" },
  { spacing: 12, label: "Blowing", value: "55" },
  { spacing: 12, label: "Moulding", value: "57" },
  { spacing: 12, label: "Plastics welding and processing", value: "53" },
  { spacing: 8, label: "Plastic profiles", value: "560" },
  { spacing: 4, label: "Printing", value: "5" },
  { spacing: 8, label: "Advertising", value: "148" },
  { spacing: 8, label: "Book/Periodicals printing", value: "150" },
  { spacing: 8, label: "Labelling and packaging printing", value: "145" },
  { spacing: 4, label: "Textile and Clothing", value: "7" },
  { spacing: 8, label: "Clothing", value: "44" },
  { spacing: 8, label: "Textile", value: "45" },
  { spacing: 4, label: "Wood", value: "8" },
  { spacing: 8, label: "Other (Wood)", value: "337" },
  { spacing: 8, label: "Wooden building materials", value: "51" },
  { spacing: 8, label: "Wooden houses", value: "47" },
  { spacing: 0, label: "Other", value: "3" },
  { spacing: 4, label: "Creative industries", value: "37" },
  { spacing: 4, label: "Energy technology", value: "29" },
  { spacing: 4, label: "Environment", value: "33" },
  { spacing: 0, label: "Service", value: "2" },
  { spacing: 4, label: "Business services", value: "25" },
  { spacing: 4, label: "Engineering", value: "35" },
  {
    spacing: 4,
    label: "Information Technology and Telecommunications",
    value: "28",
  },
  {
    spacing: 8,
    label: "Data processing, Web portals, E-marketing",
    value: "581",
  },
  { spacing: 8, label: "Programming, Consultancy", value: "576" },
  { spacing: 8, label: "Software, Hardware", value: "121" },
  { spacing: 8, label: "Telecommunications", value: "122" },
  { spacing: 4, label: "Tourism", value: "22" },
  { spacing: 4, label: "Translation services", value: "141" },
  { spacing: 4, label: "Transport and Logistics", value: "21" },
  { spacing: 8, label: "Air", value: "111" },
  { spacing: 8, label: "Rail", value: "114" },
  { spacing: 8, label: "Road", value: "112" },
  { spacing: 8, label: "Water", value: "113" },
];

const Form = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(initialFormState);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const agreedChangeHandler = (e) => {
    setFormState((prevState) => ({ ...prevState, agreed: e.target.checked }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!id)
      if (!formState.agreed) {
        toast.error("You must agree to the terms");
        return;
      }

    setIsSubmitting(true);
    try {
      let response;
      if (id) response = await axios.put("/records/" + id, formState);
      else response = await axios.post("/records", formState);

      toast.success(response.data.msg);
      if (!id) setFormState(initialFormState);
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.errors
          ? err.response.data.errors[0]
          : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await axios.get("/records/" + id);

      setFormState(response.data.record);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-md shadow-md my-6">
      <h2 className="text-2xl font-semibold mb-4">
        Enter your name and select your sectors
      </h2>

      <form onSubmit={formSubmitHandler}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Name"
            name="name"
            value={formState.name}
            onChange={inputChangeHandler}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="sectors"
            className="block text-sm font-medium text-gray-600"
          >
            Sectors:
          </label>
          <select
            onChange={(e) => {
              var options = e.target.options;
              var value = [];
              for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                  value.push(options[i].value);
                }
              }

              inputChangeHandler({
                target: {
                  name: "sectors",
                  value,
                },
              });
            }}
            id="sectors"
            multiple
            size="5"
            className="mt-1 p-2 w-full border rounded-md"
          >
            {options.map((el, idx) => {
              return (
                <option
                  key={"options-" + idx}
                  value={el.value}
                  className="whitespace-nowrap"
                >
                  {new Array(el.spacing).fill(0).map((el2, idx2) => (
                    <React.Fragment key={"nbsp-" + idx + "-" + idx2}>
                      &nbsp;
                    </React.Fragment>
                  ))}{" "}
                  {el.label} {formState.sectors.includes(el.value) && "✔️"}
                </option>
              );
            })}
          </select>
        </div>

        {!id && (
          <div className="mb-4">
            <input
              type="checkbox"
              id="agree"
              className="mr-2"
              name="agree"
              checked={formState.agreed}
              onChange={agreedChangeHandler}
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              Agree to terms
            </label>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:pointer-events-none disabled:opacity-50"
          disabled={isSubmitting || isLoading}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
