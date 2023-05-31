import React, { useEffect, useState } from 'react';
import { CategoryProps } from '@/components/marketplace/createListing/CategoryForm';
import { useQuery } from 'react-query';
import ParameterForm, {
  CategoryParametersProps,
  ParameterFormProps,
  ParameterValidationProps,
} from '@/components/marketplace/createListing/ParameterForm';
import fetchParameters from '@/middlewares/fetchParameters';


// run this query when category is selected
const useGetParametersQuery = (ids: string, category: CategoryProps | null) => {
  const { data } = useQuery(['parameters', ids, category], () => fetchParameters(ids), {
    enabled: ids !== '' || category !== null,
  });

  return data;
};

const useParameter = (category: CategoryProps | null) => {
  const [parameters, setParameters] = useState<ParameterFormProps[]>([]);
  const [parameterIDs, setParameterIDs] = useState<string>('');
  const [categoryParameters, setCategoryParameters] = useState<CategoryParametersProps[]>([]);


  const [parameterErrors, setParameterErrors] = useState<ParameterValidationProps[]>([]);

  const parametersData = useGetParametersQuery(parameterIDs, category);


  const parameterForm = category && parametersData && <ParameterForm
    setParameters={setParameters}
    data={parametersData}
    errors={parameterErrors} />;

  const resetParameterErrors = () => {
    setParameterErrors([]);
  };

  const updateCategoryParameters = async () => {
    const parameterIds: string[] = [];
    const categoryParameters: CategoryParametersProps[] = [];

    if (category != null) {
      category.parameters.forEach((parameter) => {
        const { parameterId } = parameter;
        parameterIds.push(parameterId);
        categoryParameters.push(parameter);
      });

      const parameterIdsString = parameterIds.toString();

      setCategoryParameters(categoryParameters);
      setParameterIDs(parameterIdsString);
    }
  };

  const parameterValidation = () => {
    let formIsValid = true;
    const newParameterErrors: ParameterValidationProps[] = [];

    categoryParameters.forEach((categoryParameter) => {
      const { parameterId, required } = categoryParameter;
      const parameter = parameters.find((parameter) => parameter.paramId === Number(parameterId));

      if (parametersData) {
        const detailedParameter = parametersData.find((parameter) => parameter.id === parameterId);

        if (!detailedParameter) {
          return;
        }

        if (!parameter && required) {
          newParameterErrors.push({
            parameterId,
            error: `${detailedParameter.displayName} is required`,
          });
        }

        if (!parameter) {
          return;
        }

        switch (detailedParameter.dataType) {
          case 'number':
            if (!Number.isNaN(parameter.value)) {
              newParameterErrors.push({
                parameterId,
                error: `${detailedParameter.displayName} must be a number`,
              });
            }
            break;
          case 'boolean':
            if (typeof parameter.value !== 'boolean') {
              newParameterErrors.push({
                parameterId,
                error: `${detailedParameter.displayName} must be a boolean`,
              });
            }
            break;
          default:
            break;
        }
      }
    });

    setParameterErrors(newParameterErrors);

    if (newParameterErrors.length > 0) {
      formIsValid = false;
    }

    return formIsValid;
  };

  // Use Effects

  useEffect(() => {
    updateCategoryParameters();
  }, [category, parameterIDs]);

  const parameterData = {
    parameters,
  }

  return {
    parameterForm,
    parameterData,
    parameterValidation,
    resetParameterErrors,
  };

};

export default useParameter;
