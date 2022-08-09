import { CalculateData, CalculateLast6Months } from "../../Utilities";

describe("testing Chart Data", () => {
    test("Calculate Last 6 months Label", () => {
        
        const mockDateObject = new Date("2022-02-26T22:42:16.652Z")
        const spy = jest
        .spyOn(global, "Date")
        .mockImplementation(() => mockDateObject)

        const finalResult = ["Sept", "Oct", "Nov", "Dec", "Jan", "Feb"]

        const result = CalculateLast6Months(mockDateObject)
        spy.mockRestore();
        expect(result).toEqual(finalResult)
    });

})