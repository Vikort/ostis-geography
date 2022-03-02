#pragma once

#include "sc-memory/sc_module.hpp"
#include "FindCateringOrganizationByRateService.hpp"
#include "FindCateringOrganizationByRateModule.generated.hpp"


class FindCateringOrganizationByRateAgentModule : public ScModule
{
  SC_CLASS(LoadOrder(1000))
  SC_GENERATED_BODY()

  virtual sc_result InitializeImpl() override;
  virtual sc_result ShutdownImpl() override;

private:
  std::unique_ptr<FindCateringOrganizationByRateAgentPythonService> m_FindCateringOrganizationByRateService;
};
