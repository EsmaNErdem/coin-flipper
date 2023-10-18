import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import CoinFlipper from "./CoinFlipper";

beforeEach(function() {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.25)
      .mockReturnValueOnce(0.75);
});

test('renders without crashing', () => {
    render(<CoinFlipper />);
});

test('matches snapshot', () => {
    const { asFragment } = render(<CoinFlipper />);
    expect(asFragment()).toMatchSnapshot();
  });
  

test('there is no image at the beginning', () => {
    const { queryByTestId } = render(<CoinFlipper />);
    expect(queryByTestId("coin-image")).toBeNull();
});

test('there is image show after clicking and it is head', () => {
    const { queryByTestId, queryByAltText, getByText } = render(<CoinFlipper />);

    const button = queryByTestId("flipping-button")
    fireEvent.click(button);

    expect(queryByTestId("coin-image")).toBeInTheDocument();

    // by mocking random we know first coin will be head
    expect(queryByAltText("head")).toBeInTheDocument();
    expect(queryByAltText("tail")).not.toBeInTheDocument();
    expect(getByText("Out of 1, head: 1 and tail: 0")).toBeInTheDocument();
});

test('after clicking twice, check it is tail', () => {
    const { queryByTestId, queryByAltText, getByText } = render(<CoinFlipper />);

    const button = queryByTestId("flipping-button")
    fireEvent.click(button);
    fireEvent.click(button);

    expect(queryByTestId("coin-image")).toBeInTheDocument();

    // by mocking random we know first coin will be head
    expect(queryByAltText("tail")).toBeInTheDocument();
    expect(queryByAltText("head")).not.toBeInTheDocument();
    expect(getByText("Out of 2, head: 1 and tail: 1")).toBeInTheDocument();
});
  
afterEach(function() {
    Math.random.mockRestore();
});
