/* Remember that blanket will only work with brackets live preview */
/* Try to maximise the coverage of the SantaModel object */

describe("Santa", function() {

  describe("getCurrentRequest", function() {
      it("should get the first request for first", function() {
          expect(SantaModel.getCurrentRequest).toBe(SantaModel.listQuestions[0]);
      });
  });
    
describe("pack", function() {
      
  });
});
