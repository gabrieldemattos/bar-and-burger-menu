import { render } from "@testing-library/react";
import ProductDetailsPage from "../../app/product-details/[slugId]/[slugName]/page";

describe("Product Details Page", () => {
  it("should render correctly", () => {
    const props = {
      params: { slugId: 1, slugName: "hamburguer smash" },
    };

    const { getByText } = render(<ProductDetailsPage {...props} />);

    expect(getByText(props.params.slugName)).toBeTruthy();
    expect(getByText(props.params.slugId)).toBeTruthy();
  });
});
