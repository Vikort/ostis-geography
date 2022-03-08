#pragma once

#include "sc-memory/sc_module.hpp"
#include "FindCateringOrganizationByPriceCategoryService.hpp"
#include "FindCateringOrganizationByPriceCategoryModule.generated.hpp"


class FindCateringOrganizationByPriceCategoryAgentModule : public ScModule
{
  SC_CLASS(LoadOrder(1000))
  SC_GENERATED_BODY()

  virtual sc_result InitializeImpl() override;
  virtual sc_result ShutdownImpl() override;

private:
  std::unique_ptr<FindCateringOrganizationByPriceCategoryAgentPythonService> m_FindCateringOrganizationByPriceCategoryService;
};
