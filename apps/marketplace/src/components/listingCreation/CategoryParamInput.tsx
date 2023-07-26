/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Parameter } from '@/utils/api/client/zod';
import { Typography } from '@mui/material';
import { t } from 'i18next';
import { DataType, ParameterType } from '@inc/db-enums';
import { FormDropdownSelector, FormInputGroup, FormTextInput, FormToggleButton } from '../forms';
import FormNumberInput from '../forms/FormNumberInput';

type CategoryParamInputProps = {
  parameter: Parameter;
  isLoading: boolean;
  submitSuccess: boolean;
  required?: boolean;
  sx?: React.ComponentProps<typeof FormInputGroup>['sx'];
};

const CategoryParamInput = ({
  parameter,
  isLoading,
  submitSuccess,
  required,
  sx,
}: CategoryParamInputProps) => {
  // Determine the input component to use
  const renderInputComponent = () => {
    switch (parameter.dataType) {
      case DataType.number:
        // @ts-ignore
        return <FormNumberInput />;
      case DataType.boolean:
        return (
          // @ts-ignore
          <FormToggleButton
            labelComponent={
              <Typography variant="body1" fontWeight="medium">
                {parameter.displayName}
              </Typography>
            }
            options={[
              {
                label: 'Yes',
                value: 'true',
              },
              {
                label: 'No',
                value: 'false',
              },
            ]}
            sx={{
              columnGap: '0',
            }}
          />
        );
      default:
        break;
    }

    if (parameter.type === ParameterType.TWO_CHOICES && parameter.options) {
      return (
        // @ts-ignore
        <FormToggleButton
          labelComponent={
            <Typography variant="body1" fontWeight="medium" sx={{ marginBottom: '0.5rem' }}>
              {parameter.displayName}
            </Typography>
          }
          options={parameter.options.map((e) => ({
            label: e,
            value: e,
          }))}
          sx={{
            columnGap: '0',
          }}
        />
      );
    }

    if (parameter.type === ParameterType.MANY_CHOICES && parameter.options) {
      return (
        // @ts-ignore
        <FormDropdownSelector
          options={parameter.options.map((e) => ({
            label: e,
            value: e,
          }))}
        />
      );
    }

    if (parameter.type === ParameterType.OPEN_ENDED) {
      // @ts-ignore
      return <FormTextInput />;
    }

    return (
      <Typography variant="body1" fontWeight="medium">
        {t('An error occurred, please try again later')}
      </Typography>
    );
  };

  return (
    <FormInputGroup
      sx={{ flex: 1, ...sx }}
      label={parameter.displayName}
      name={parameter.id.toString()}
      isLoading={isLoading}
      success={submitSuccess}
      required={required}
    >
      {renderInputComponent()}
    </FormInputGroup>
  );
};

export default CategoryParamInput;
