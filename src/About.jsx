import "./About.css";

const About = (props) => {
  return (
    <div className="about-text">
      <p>
        The liver is a kind of "biochemical laboratory of the body", and it
        plays many and complex roles such as: regulating the level of sugar and
        lipids in the blood, dealing with foreign factors, protein production,
        detoxification, processing nutrients absorbed from the intestine and
        more.
      </p>
      <p>
        Unlike other organs like kidney or heart, the liver has no substitute
        and its dysfunction cannot be overcome by external means. Therefore the
        solution for patients suffering from a problem that impairs its
        function, is transplantation.
      </p>
      <p>
        A biology marker is "a defined trait that is measured as a marker for a
        normal biological process, a pathogenic process, in response to exposure
        or intervention including intervention as part of treatment." Metabolic
        markers are medical metrics such as physiological indices, blood
        composition, molecular analysis of biopsies, and indices resulting from
        imaging (C.T., ultrasound, MRI).
      </p>
      <p>
        This research project focuses on the characterization and classification
        of patterns of the biological marker levels MELD, among liver patients
        awaiting transplantation. model for end-stage liver disease (MELD) is
        the result of a mathematical formula that combines serum bilirubin,
        creatinine and INR levels. The research question focuses on finding
        differences in the kinetics of MELD levels in patients over the period
        examined, in order to try to predict a patient's future condition, what
        level of urgency for the transplant he is in and what are the chances of
        successful future transplantation as a function of his current
        condition.
      </p>
      <p>
        To do this we analyzed data from MELD results obtained from Dr. Harel
        Dahari of Loyola University in Chicago USA, performed a linear
        regression and by manual and algorithmic filtering we divided the
        patients into categories that constitute the research hypothesis.
      </p>
      <p>
        From the analysis of the data we saw that there is a uniform
        distribution of the results in the distribution groups, that is, it is
        not possible to indicate a significant relationship between the
        distribution groups of the hypothesis and the reliance of a particular
        result among the patients.
      </p>
      <p>
        As part of the project, we created a user interface that is a tool for
        future research in the field, through which it is possible to upload
        patient data and receive analysis automatically and examine the kinetics
        of a specific patient. This interface is dynamic and can be improved to
        fit a future hypothesis.
      </p>
    </div>
  );
};
export default About;
