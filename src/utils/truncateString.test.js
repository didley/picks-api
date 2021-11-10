import { jest } from "@jest/globals";
import { truncStr } from "./truncateString";

describe("fn truncStr", () => {
  it("truncates string", () => {
    const str = "tenCharStr";
    const instance = truncStr(str, 5);
    expect(instance).toBe("tenCh");
  });
  it("replaced last 3 characters with ellipsis if option supplied", () => {
    const str = "tenCharStr";
    const instance = truncStr(str, 5, { ellipsis: true });
    expect(instance).toBe("te...");
  });
  it("throws if no limit param supplied", () => {
    expect(() => truncStr("str")).toThrow();
  });
  it("returns undefined if no string supplied", () => {
    const instance = truncStr(undefined, 5, { ellipsis: true });
    expect(instance).toBe(undefined);
  });

  it("returns undefined if string param not of type string and console logs error message", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => null); // suppresses error logs from test console

    // function
    expect(truncStr(() => "fn", 5, { ellipsis: true })).toBe(undefined);
    // object
    expect(truncStr({ obj: "obj" }, 5, { ellipsis: true })).toBe(undefined);
    // number
    expect(truncStr(1, 5, { ellipsis: true })).toBe(undefined);

    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
