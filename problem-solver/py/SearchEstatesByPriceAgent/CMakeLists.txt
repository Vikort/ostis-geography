file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchEstatesByPriceModule SHARED ${SOURCES})

target_include_directories(SearchEstatesByPriceModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchEstatesByPriceModule sc-memory)

add_dependencies(SearchEstatesByPriceModule sc-memory)

sc_codegen(SearchEstatesByPriceModule ${CMAKE_CURRENT_LIST_DIR})
