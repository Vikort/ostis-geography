file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindCateringOrganizationByOpenYearModule SHARED ${SOURCES})

target_include_directories(FindCateringOrganizationByOpenYearModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindCateringOrganizationByOpenYearModule sc-memory)

add_dependencies(FindCateringOrganizationByOpenYearModule sc-memory)

sc_codegen(FindCateringOrganizationByOpenYearModule ${CMAKE_CURRENT_LIST_DIR})
