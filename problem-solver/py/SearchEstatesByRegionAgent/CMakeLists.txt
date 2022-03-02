file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchEstatesByRegionModule SHARED ${SOURCES})

target_include_directories(SearchEstatesByRegionModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchEstatesByRegionModule sc-memory)

add_dependencies(SearchEstatesByRegionModule sc-memory)

sc_codegen(SearchEstatesByRegionModule ${CMAKE_CURRENT_LIST_DIR})
